class Api::MessagesController < ApplicationController
    # Used for saving received data and broadcasting that data to the appropriate channels.
    def create
      message = Message.new(message_params)
      conversation = Conversation.find(message_params[:conversation_id])
      
      if message.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          MessageSerializer.new(message)
        ).serializable_hash
        MessagesChannel.broadcast_to conversation, serialized_data
        head :ok
      elsif message.errors
        puts "error"
        puts message.errors.each { |error| puts error }
      end

    end
    
    private
    
    def message_params
      params.require(:message).permit(:text, :conversation_id, :user_id)
    end
end

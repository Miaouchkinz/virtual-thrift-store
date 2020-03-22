class Api::ConversationsController < ApplicationController
  # Going to be used for the front-end’s initial fetch request to receive the current existing
  # conversations and their messages.
  def index
    conversations = Conversation.all
    render json: conversations
  end

  # Used for saving received data and broadcasting that data to the appropriate channels.
  def create
    conversation = Conversation.new(conversation_params)

    if conversation.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ConversationSerializer.new(conversation)
      ).serializable_hash
      
      ActionCable.server.broadcast 'conversations_channel', serialized_data
      head :ok
    elsif conversation.error
      puts "error"
    end
  end
  
  private
  
  def conversation_params
    params.require(:conversation).permit(:title)
  end
end

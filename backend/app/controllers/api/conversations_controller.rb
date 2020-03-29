class Api::ConversationsController < ApplicationController
  # Going to be used for the front-end’s initial fetch request to receive the current existing
  # conversations and their messages.
  def index
    conversations = Conversation.all

    render json: conversations
  end

  # Get the current user's conversations
  def show
    conversations = Conversation.where(user_1: params[:id]).or(Conversation.where(user_2: params[:id]))

    structured_conversations = []
    conversations.each do | conversation |
      full_convo = {
          id: conversation.id,
          title: conversation.title,
          created_at: conversation.created_at,
          user_1: User.select(:id, :name, :avatar_url).where({id: conversation.user_1_id}),
          user_2: User.select(:id, :name, :avatar_url).where({id: conversation.user_2_id}),
          messages: conversation.messages
      }
      structured_conversations.push(full_convo);
    end
    
    render json: structured_conversations
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
    elsif conversation.errors
      puts "error"
      puts conversation.errors.each { |error| puts error }
    end
  end
  
  private
  
  def conversation_params
    params.require(:conversation).permit(:id, :title, :user_1_id, :user_2_id)
  end
end

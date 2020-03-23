class Api::ClothingsController < ApplicationController
  
  def index
    clothings = Clothing.all
    render json: clothings
  end
  
  def show
    clothings = Clothing.order(id: :desc).where(available_for_exchange: true)
    render json: clothings
  end
  

end

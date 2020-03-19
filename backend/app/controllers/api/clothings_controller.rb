class Api::ClothingsController < ApplicationController

  def index
    clothings = Clothing.order(id: :desc).where(available_for_exchange: true)
    render json: clothings
  end

end

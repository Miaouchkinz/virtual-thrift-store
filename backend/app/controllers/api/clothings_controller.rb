class Api::ClothingsController < ApplicationController

  def index
    clothings = Clothing.order(id: :desc)
    render json: clothings
  end

end

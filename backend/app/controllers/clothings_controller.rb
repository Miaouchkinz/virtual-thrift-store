class ClothingsController < ApplicationController
  def index
    clothings = Clothing.all
    render json: clothings
  end
end

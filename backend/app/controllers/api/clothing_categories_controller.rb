class Api::ClothingCategoriesController < ApplicationController

  def index
    clothing_categories = ClothingCategory.all
    render json: clothing_categories
  end

end

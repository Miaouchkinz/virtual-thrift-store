Rails.application.routes.draw do

  namespace :api do
    resources :users, 
              :clothings, 
              :bookmarks, 
              :clothing_categories
  end

end

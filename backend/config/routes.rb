Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  

  namespace :api do
    resources :registrations, only: [:create]
    resources :users, :clothings, :bookmarks, :clothing_categories
    get '/clothings/available_for_exchange', to: 'api/clothings#show'
  end
 
  
  resources :sessions, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  root to: "static#home"
end

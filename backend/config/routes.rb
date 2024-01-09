Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :registrations, only: [:create, :destroy, :update]
  resources :sessions, only: [:create, :destroy]
  delete :logout, to:"sessions#logout"
  get :logged_in, to:"sessions#logged_in"

  resources :categories
  resources :topics, only: [:create, :destroy, :show]
  resources :posts, only: [:create, :destroy, :update]

  # set defualt path to the categories page
  root "pages#index"
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

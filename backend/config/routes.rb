Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :categories, only: [:index, :show] # create & destroy functions are not available to users
  resources :topics, only: [:create, :destroy, :show]
  resources :posts, only: [:create, :destroy, :update]

  resources :authentication, path: 'users', only: [] do
    collection do
      post "/", to: "authentication#create"
      get "logged_in", to: "authentication#logged_in"
      delete "logout", to: "authentication#logout"
      delete "/:id", to: "authentication#destroy_user"
    end
  end


  # set defualt path to the categories page
  root "pages#index"
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end

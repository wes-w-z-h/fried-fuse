Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # old routes
  # resources :registrations, only: [:create, :destroy, :update]
  # resources :sessions, only: [:create, :destroy]
  # delete :logout, to:"sessions#logout"
  # get :logged_in, to:"sessions#logged_in"

  resources :categories
  resources :topics, only: [:create, :destroy, :show]
  resources :posts, only: [:create, :destroy, :update]

  # POST   /users/create_session(.:format)authentication#create_session
  # GET    /users/logged_in(.:format)authentication#logged_in
  # DELETE /users/logout(.:format)authentication#logout
  # POST   /users/create_user(.:format)authentication#create_user
  # DELETE /users/:id(.:format) authentication#destroy_user
  # PATCH  /users/:id(.:format) authentication#update_user
  # TODO consolidate login & registration frontend into authentication
  resources :authentication, path: 'users', only: [] do
    collection do
      post "/", to: "authentication#create"
      # post "create_session", to: "authentication#create_session"
      get "logged_in", to: "authentication#logged_in"
      delete "logout", to: "authentication#logout"
      # post "create_user", to: "authentication#create_user"
      delete "/:id", to: "authentication#destroy_user"
      patch "/:id", to: "authentication#update_user"
    end
  end


  # set defualt path to the categories page
  root "pages#index"
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

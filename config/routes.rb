Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "components#index"

  # Defines the routes for the components controller



  resources :components, only: [:index]

  namespace :api do
    namespace :v1 do

      resources :users, only: [:show] do
        member do
          get :borrowed_books
        end
      end

      resources :books do
        member do
          post :borrow
          post :return
        end
      end

      resources :borrowings do
        collection do
          get :borrowed_books
          get :overdue_books
          get :overdue_members
        end
      end

    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end

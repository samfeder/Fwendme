Fwendme::Application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:new, :create, :show, :index] do
    resources :chats, only: :new
  end
  resource :session, only: [:new, :create, :destroy]

  resources :chats, except: :new

end

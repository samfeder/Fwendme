Fwendme::Application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:new, :create, :show, :index, :edit, :update] do
      resources :friendships, only: [:create, :new]
    end

    resource :session, only: [:new, :create, :destroy]

    resources :chats do
      resources :messages, only: [:new, :index, :create]
    end

    resources :chat_memberships, only: [:create, :new, :destroy]

    resources :messages, only: :show
  end



  resources :users, only: [:new, :create, :show, :index, :edit, :update] do
    resources :friendships, only: [:create, :new]
  end

  resource :session, only: [:new, :create, :destroy]

  resources :chats, except: :index do
    resources :messages, only: :new
  end

  resources :chat_memberships, only: [:create, :new, :destroy]

  resources :messages, only: [:create, :show]

end

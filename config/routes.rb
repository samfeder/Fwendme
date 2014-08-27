Fwendme::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :show, :index, :edit, :update]

  resource :session, only: [:new, :create, :destroy]

  resources :chats, except: :index do
    resources :messages, only: :new
  end

  resources :messages, only: [:create, :show]

end

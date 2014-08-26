Fwendme::Application.routes.draw do
  root to: "session#new"

  resources :users, only: [:new, :create, :show, :index]
  resource :session, only: [:new, :create, :destroy]


end

require 'spec_helper'

feature "Sign up" do
  before :each do
    visit "/users/new"
  end

  it "has a user sign up page" do
    page.should have_content "Sign Up"
  end

  it "takes a email and password" do
    page.should have_content "Email"
    page.should have_content "Password"
  end

  it "validates the presence of the user's email" do
    click_button 'Sign Up'
    page.should have_content 'Sign Up'
    page.should have_content "Email can't be blank"
  end

  it "rejects a blank (zero-length) password" do
    fill_in "Email", with: 'hello_world@test.com'
    click_button 'Sign Up'
    page.should have_content 'Sign Up'
    page.should have_content 'Password is too short'
  end

  it "validates that the password is at least 6 characters long" do
    fill_in "Email", with: 'hello_world@test.com'
    fill_in "Password", with: 'short'
    click_button 'Sign Up'
    page.should have_content 'Sign Up'
    page.should have_content 'Password is too short'
  end

  it "logs the user in and redirects them to user show on success" do
    sign_up_as_hello_world
    # add user name to application.html.erb layout
    page.should have_content "hello_world@test.com"
  end
end

feature "Sign out" do
  it "has a sign out button" do
    sign_up_as_hello_world
    page.should have_button 'Sign Out'
  end

  it "after logout, a user is not allowed access to user's index page" do
    sign_up_as_hello_world

    click_button 'Sign Out'
    visit '/users'

    # redirect to login page
    page.should have_content 'Sign In'
    page.should have_content "Sign Up"
  end
end

feature "Sign in" do
  it "has a sign in page" do
    visit "/session/new"
    page.should have_content "Sign In"
  end

  it "takes a email and password" do
    visit "/session/new"
    page.should have_content "Sign In"
    page.should have_content "Password"
  end

  it "returns to sign in on failure" do
    visit "/session/new"
    fill_in "Email", with: 'hello_world@test.com'
    fill_in "Password", with: 'hello'
    click_button "Sign In"

    # return to sign-in page
    page.should have_content "Sign In"
    page.should have_content "Email"
  end

  it "takes a user to user show on success" do
    sign_up_as_hello_world
    # add button to sign out in application.html.erb layout
    click_button 'Sign Out'

    # Sign in as newly created user
    visit "/session/new"
    fill_in "Email", with: 'hello_world@test.com'
    fill_in "Password", with: 'abcdef'
    click_button "Sign In"
    page.should have_content "hello_world@test.com"
  end
end
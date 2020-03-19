if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "some-app-api.herokuapp.com"
else
  # for development - localhost
  Rails.application.config.session_store :cookie_store, key: "_authentication_app"
end
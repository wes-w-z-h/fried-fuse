# Rails.application.config.session_store :cookie_store, key: '_auth'
# Rails.application.config.middleware.use ActionDispatch::Cookies
# Rails.application.config.middleware.use ActionDispatch::Session::CookieStore, key: '_auth'

# KEY = '_auth'

Rails.application.config.middleware.use ActionDispatch::Cookies
Rails.application.config.middleware.use ActionDispatch::Session::CookieStore, key: "_auth"
Rails.application.config.middleware.insert_after(
  ActionDispatch::Cookies,
  ActionDispatch::Session::CookieStore,
  key: "_auth",
)

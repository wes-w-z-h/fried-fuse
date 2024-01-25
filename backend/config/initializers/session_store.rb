# initialize the session store since api only not loaded

Rails.application.config.middleware.use ActionDispatch::Cookies
Rails.application.config.middleware.use ActionDispatch::Session::CookieStore, key: "_auth"
Rails.application.config.middleware.insert_after(
  ActionDispatch::Cookies,
  ActionDispatch::Session::CookieStore,
  key: "_auth",
)

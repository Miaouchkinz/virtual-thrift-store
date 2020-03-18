class BookmarksController < ApplicationController

  def index
    bookmarks = Bookmark.all
    render json: bookmarks
  end    

end

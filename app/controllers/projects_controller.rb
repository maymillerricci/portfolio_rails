class ProjectsController < ApplicationController
  layout false

  def canvas_draw
  end

  def periodic_table
  end

  def countries
    @countries = ISO3166::Country.all.map(&:name).sort
  end

  def country_data
    @country = ISO3166::Country.find_country_by_name(params[:country]).data
    flag_path = "flags/#{@country["name"]}.png"
    if Rails.application.assets.find_asset(flag_path)
      @country["asset_path"] = ActionController::Base.helpers.asset_path(flag_path)
    else
      @country["asset_path"] = ActionController::Base.helpers.asset_path("flags/Unknown.png")
    end
    respond_to do |format|
      format.json { render json: @country }
    end
  end

  def tic_tac_toe
  end
end

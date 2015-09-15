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
    @country["asset_path"] = ActionController::Base.helpers.asset_path("flags/#{@country["name"]}.png")
    respond_to do |format|
      format.json { render json: @country }
    end
  end
end

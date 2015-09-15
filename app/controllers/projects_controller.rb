class ProjectsController < ApplicationController
  layout false

  def canvas_draw
  end

  def periodic_table
  end

  def countries
    @countries = ISO3166::Country.all.map(&:name).sort
  end
end

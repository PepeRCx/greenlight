# frozen_string_literal: true

class UpdateBrandingColors < ActiveRecord::Migration[7.0]
  def up
    # Update PrimaryColor
    primary_color_setting = Setting.find_by(name: 'PrimaryColor')
    if primary_color_setting
      SiteSetting.where(setting: primary_color_setting).update_all(value: '#1800AD')
    end

    # Update PrimaryColorLight
    primary_color_light_setting = Setting.find_by(name: 'PrimaryColorLight')
    if primary_color_light_setting
      SiteSetting.where(setting: primary_color_light_setting).update_all(value: '#E8E6F7')
    end
  end

  def down
    # Revert to original defaults (approximate, since user might have customized it)
    primary_color_setting = Setting.find_by(name: 'PrimaryColor')
    if primary_color_setting
      SiteSetting.where(setting: primary_color_setting, value: '#1800AD').update_all(value: '#467fcf')
    end

    primary_color_light_setting = Setting.find_by(name: 'PrimaryColorLight')
    if primary_color_light_setting
      SiteSetting.where(setting: primary_color_light_setting, value: '#E8E6F7').update_all(value: '#e8eff9')
    end
  end
end

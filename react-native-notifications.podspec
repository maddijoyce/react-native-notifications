require 'json'

Pod::Spec.new do |s|
  package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

  s.name           = package['name']
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => 'https://github.com/wix/react-native-notifications', :tag => s.version }

  s.requires_arc   = true
  s.platform       = :ios, '8.0'

  s.preserve_paths = 'LICENSE', 'README.md', 'package.json', 'notification.ios.js', 'notification.android.js', 'index.android.js', 'index.ios.js', 'index.js', 'index.d.ts'
  s.source_files   = 'ios/*.{h,m}'

  s.dependency 'React'
end

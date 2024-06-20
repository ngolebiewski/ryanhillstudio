# Ryan Hill Studio

## "Headless Wordpress" Artist Portfolio site 

Work-in-progress Deployment: https://ryanhillstudio.netlify.app/
Future Permanent Location: https://www.ryanhill.studio/
Seperate WordPress Installation to use as API: https://api.ryanhill.studio/wp-json

# Tech
- React
- Tailwind CSS
- Ant Design
- Howler -> JS Sounds package
- Gulp -> Deploy the Dist folder to an old-fashioned shared server
- DotEnv -> Keep stuff secret
- React Router -> Make HTML routes
- Vite -> Dev environment and build tool
- VSCode -> IDE
- Wordpress

# Ideas
- Website as Museum
- Keep it simple
- "No pressure to be super sonic"
- Direction: low tech == use old technology, clunky on purpose

![Ryan Hill Menu Doodle](/public/images/site/menu/ryan_menu_01.jpg)

# Process
- Originally thought of creating entire Node app/PostgresQL DB for portfolio, however, decided to go for a minimal cost deployment on a legacy server service that can do PHP, but can't do persistent server processes. Then found out WordPress has a built in and robust API. WE ALL WANT JSON.
- Image mapping for a hand-drawn navigation menu. Using https://www.image-map.net/ to get a polygonal map.
- Realized that it's best to have the wordpress install in a, so rewrite rules for Wordpress and React Router don't conflict. So, api.ryanhill.studio (for back end) and ryanhill.studio (for front end)
  

# Hacked WP API Structure of site.
- Fixed set of "parent" pages to sync up with artist's menu
- Can have one level of "children" pages for each "Parent"
- Studio section = WP Posts (i.e. blog)
- Portfolio sections (parent) and art series sections (children) = WP Pages
- Images = WP Media

# How to use the CMS, i.e., the quirks with repurposing this pre-built API.
- Navigate to your site.
- In this case: https://api.ryanhill.studio/wp-admin/ and enter in your username and password.
  
## Media
- 

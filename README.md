## Description
This little project is based off of [notion.so](https://www.notion.so) for an interview at Pine Park Health. The idea is to have multiple display options that are all updated whenever the data is updated. In this case, there is both a table view and a board view. On notion, they have multiple types of operations that you can perform, such as adding rows, columns, specifying column attributes, etc. I added some of the available operations, but I also simplified them to avoid too many event listeners and keep it from getting too complicated. 

### Usage info
You can switch between table and board view with the dropdown. For the board view, I just went with another table so I didn’t have to mess with too much css. You can add new pokemon, which will update the data stored in a class using React’s state. You can also update the Name and Tags on the table, and it will update in the board view. I have input boxes for new attributes and tags. Adding a new attribute will add a new column for that attribute. In order for a new tag to appear in the board view, it must be added using the Add Tag button. This greatly simplified the way I could implement tags.

### Running the app
You must have `npm` installed. Then, you can install any needed dependencies with `npm install` and start the app with `npm start`.

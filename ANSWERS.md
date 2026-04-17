# Task Questions

## What does the single responsibility principle consist of? What's its purpose?

SRP is the idea that a module should be focused on a single purpose, not trying to do multiple unrelated task at once.
For example a list component should not contain the logic behind fetching data, parsing data and subscribing to events, it should only handle displaying the resulting data and delegating fetching and parsing content tasks to hooks/components.

In that example, the list is not aware of fetching and parsing, only aware and controlling how the data is displayed in a list. The hook is in charge of fetching content (internally other hooks or functions deal with caching and parsing its content to the required data structure) and the ListItem component is in charge of adapting structured data into a displayable list item

SRP improves structure, stability and readability of the code

## What characteristics, in your opinion, does “good” code or clean code have?

Good code follows:

- Understandable: the name of the the elements reflect the intent of its use.
- Low coupling of its components: interdependency makes components prone to errors and difficulty in replacing them, components that are loosely coupled are easier to test and replace.
- Structured organization: clean boundaries between the project layers, for example this project:
  - UI layer: components/
  - Data layer: api/, db/
  - State layer: not in this project, but if handling search filters state/ would be a great place to save them.
- Consistency: the code follow same naming convention and organization patterns.

## Pending improvements

1. Clean code was loosely applied, there are examples like the Gallery component that originally was planned to reuse for the popular and categories list. hooks folder is a bit disorganized with a bunch of network hooks and theme hooks. They could have been organized better.

2. Handling error states was not implemented it mostly defaulted to leave current content or show an empty list message.

3. Testing was left out due to time.
   - Test UI states of list component render: loading, error and success states.
   - Test that the categories display only 6 items
   - Test search input doesn't submit until more than 3 characters are typed
   - Test goToDetails function is called when redirecting from list item to Movie details.
   - Test the bookmark icon changes after pressing it.

4. A nice to have would be implementing react-native-mmkv as storage implementation. that library is way faster than the current AsyncStorage library.

5. The Text component only uses default fonts, to approximate better to the figma design, we need to load Poppins and Montserrat fonts.

6. In the demo video it is shown that some navigation icons are not shown when offline, after testing in a real device this behavior did not happen after turning off all network. this is probably related to how assets are handled between a dev client and a preview version.

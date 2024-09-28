# NIGPAD
Simple Note taking webapp. Uses Browser's storage.

[![Netlify Status](https://api.netlify.com/api/v1/badges/66246e0a-81cc-4054-846c-184e5d9da4de/deploy-status)](https://app.netlify.com/sites/nigpad/deploys)

![screenshot](screenshot.png)



 [Try here online](https://nigpad.netlify.app/)

## Roadmap
- 
    - [ ] Add folder organization
    - [x] Implement search functionality
    - [ ] Sort search results (e.g. lastUpdated)
    - [x] Support markdown/rich formatting
    - [x] Introduce a tagging system  
    - [x] Add dark mode toggle
    - [ ] Implement cloud sync (Firebase)
    - [ ] Cloud account customization
    - [ ] Make public notes
    - [ ] Simple NoteCard customization


### Markdown test

```
# Markdown Features Test

## 1. Headings

### H1: This is a heading 1
### H2: This is a heading 2
### H3: This is a heading 3

## 2. Emphasis

- **Bold Text**: This text is **bold**.
- *Italic Text*: This text is *italic*.
- **_Bold and Italic_**: This text is **_bold and italic_**.

## 3. Lists
 
### Unordered List
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## 4. Links

[OpenAI](https://www.openai.com)

## 5. Images

![Sample Image](https://via.placeholder.com/150) \
![Sample Image](https://picsum.photos/200)

## 6. Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.

## 7. Code

### Inline Code
Here is some inline code: `const x = 10;`

# Example Code Block and Inline Code

Here is an example of **inline code**: `const example = 'Hello, World!';`

And below is a block of code:

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('Alice'));
add bottom 3xTilda to the end
||
\/
```
`"  ```  "`

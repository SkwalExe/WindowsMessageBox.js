# WindowsMessageBox.js

![](images/banner.png)

Create Windows-like 🪟 message boxes 💬 for your website

# jsDelivr

```html
<script src="https://cdn.jsdelivr.net/gh/SkwalExe/windowsMessageBox.js@main/src/cowTranslator.min.js"></script>
```

# Example

This repo provides a simple example of usage of the library : `example.html`

Double click on the page to open a message box

# Usage 📝

This library provides 2 functions: 

- `windowsMessageBox.init()`
- `windowsMessageBox.show()`
  
# windowsMessageBox.init()

This function initializes the library.

It will be called automatically if the library is not initialized when calling the `windowsMessageBox.show()` function.

# windowsMessageBox.show()

This function creates a message box.

It takes 5 parameters:

- [`title`: The title of the message box.](#title--message)
- [`message`: The message of the message box.](#title--message)
- [`type`: The type of the message box, can be](#type)
- [`buttons`: The buttons of the message box](#buttons)
- [`position`: The position of the message box](#position)

It returns a promise that resolves when the user clicks on a button/closes the message box.

## Example 📝

### **Title & Message**

The title will be displayed in the top of the message box and the message will be displayed in the middle of the message box.

```js
windowsMessageBox.show("This is my title!", "This is my message!");
```

![](images/1.png)

### **Type**

The type defines the icon and the sound of the message box.

- `"info"`
- `"error"`
- `"warning"`

**Type -> `info`**

```js
windowsMessageBox.show("This is my title!", "This is an information message!", "info");
```

![](images/info.png)

**Type -> `warning`**

```js
windowsMessageBox.show("This is my title!", "This is a warning message!", "warning");
```

![](images/warning.png)

**Type -> `error`**

```js
windowsMessageBox.show("This is my title!", "This is an error message!", "error");
```

![](images/error.png)

### **Buttons**

This parameter defines the buttons of the message box.

**Example**

```js
let buttons = [
    ["Yes"],
    ["No"]
]

let clicked  = windowsMessageBox.show("This is my title!", "This is my message!", "info", buttons);

console.log(clicked); // "Yes" if the user clicked on the "Yes" button, "No" if the user clicked on the "No" button
```

![](images/2.png)

You can also define the value returned depending on the button clicked.

If we want the button `hello` to return `true` and the button `world` to return `false`, we can do it like this:

```js
let buttons = [
    ["hello", true],
    ["world", false]
]
```

### **Position**

This parameter defines the position of the message box.

It can be: 

- [`x`, `y`] : pop up the message box at the given position
- `"random"` : pop up the message box at a random position on the page

# final

If you have any problem, don't hesitate to open an issue

# contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<a href="https://github.com/SkwalExe#ukraine"><img src="https://raw.githubusercontent.com/SkwalExe/SkwalExe/main/ukraine.jpg" width="100%" height="15px" /></a>
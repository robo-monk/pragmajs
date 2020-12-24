![npm-size](https://img.shields.io/npm/v/pragmajs?style=for-the-badge)
![npm-size](https://img.shields.io/bundlephobia/minzip/pragmajs?style=for-the-badge)

[<img width=250px src="docs/logos/pragmajs.svg">](https://robo-monk.github.io/pragmajs)

<br>

## Dead simple, fast UI-composer in JavaScript 

[Check out Demo](https://robo-monk.github.io/pragmajs)

<br>

# Installation
```bash
npm i pragmajs
```

# How To

You can find an interactive version of this tutorial [here](https://robo-monk.github.io/pragmajs)


## Simple Concepts

### What is a Pragma?

A Pragma is an object, that has certain interesting properties and capabilities which we will explore briefly in this tutorial. Most of the Pragmas we'll be creating will be interconnected with an element in the DOM, but they're NOT the same. A Pragma, hypothetically, can have many different DOMs, and even exist without one.

### Compose

To create a Pragma, we first need to `Compose` it. In this stage, we'll be creating & manipulating the appearance of the element that is going to be connected with the new Pragma, while adding properties and behaviours to the Pragma itself.

You can always change the appearance of the element or add/remove properties of/to/from a pragma later, but structuraly you should add *most* of these when you compose it.

```js
// code exploring .with, .as
```

### Pragmatize

You'll notice that after we compose a Pragma we `pragmatize` it to tell the `Pragma` object where in the DOM it needs to be rendered, and in which fashion. We can wait and `pragmatize` the pragma element later on our program as well.

```js

// code exploring .pragmatize(), at().pragmatize(, , ,), .host, .contain
```

### Stylize

Here are some useful functions pragmas have.
```js
.css, .listen, .html.class, .element, .illustrate
```

## Advanced Concepts

### Introduction to Pragma Values

So far, we've seen how Pragmas connect with elements in the DOM. By default, a Pragma has a singular `value`. Usually this value is primitive (integer, string etc.), but of course it can be anything. Every time, the `value` of the Pragma is changed to something else, a `Chain of Actions` is being run.

### Timer Demo
```js
//timer demo without the template	
```


### Introduction to Pragma Relationships

A Pragma can also form relationships with other Pragmas. Inspired by the structure of `HTML`, where you can have a `div` inside a `div`, a Pragma can contain other Pragmas.

```js
.contain, .host, .add
```

### Master Pragma

This results in a structure where the top-level Pragma (aka the Pragma that has no *higher* parent) is called the `master`. The `master` Pragma, is a special kind of Pragma, because it will run its own `Chain of Actions` each time *any* of its children (or children of children, children of children of children etc...)  change their value.

```js
// code showcasing multiple levels of pragma parents and stuff, with contain and host
```


## Templates

Lets take a step back, and revisit our Timer Demo. Essentially the biggest chunck of code is just for changing the text of the DOM element connected with the `timer` pragma, to display the `timer` pragma `value`. If you think about it that is something that is really common, and we use it very often in various elements. Thus, Pragmajs comes with some teplates out of the box that will help you build your project faster and cleaner.

Here's the timer demo with a template:

```js
//timer demo with a template
```

Check out the current [template collection]().


## Closing Remarks

Although, PragmaJS is still in early stages of development, I think it provides us with a really interesting and beatiful way of creating and thinking about  applications. Its conceptually simple, and is built to be extensible and customisable from the ground up. Structurally we can have one singular pragma doing the high-level processing, and some other "smaller" Pragmas holding values and talking to the end user.

A Menu Template, for example, would create a Pragma that has a value that changes every time a user clicks a different menu choice. You would pass it an array of options, and it would **create the pragma for you**. You don't even need to know how many pragmas it generated, you only user the "**master**" of all the possible sub pragmas, which holds 1 singular value, treating **1 problem**, and contributing towards solving your bigger problem. 

Which itself at the end has 1 singular variable if any, but treats 1 problem. The end user doesn't care how many sub problems you had as dev to solve. You don't care how many sub sub problems a template has to solve to solve your sub problem, which in our case was a menu to edit some settings for your quantum cloud computing graph. Because you still can't center a div and CSS still is a pain in the ass.

I really came to appreciate how powerful and beautiful this concept is, and made some templates, which are included in the distribution. But the actual beauty of it is that you can and probably should **create your own templates** **using** some basic and "essential" **templates** pragma has at the moment.

I hope **you** build **epic things** with it.

robomonk


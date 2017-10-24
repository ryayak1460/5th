<!--
    5th edition, a library for 5th edition D&D applications.
    Copyright (C) 2017  Ryan Y.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->
# 5th
This project creates objects which anyone can use with another JavaScript-based
5th edition application to handle common use cases, like making a character,
handling combat or even planning an encounter.

## Usage
To use this library in your application, simply include it with `npm`:

```
npm i --save 5th
```

You will need to provide your own response handler, handler factory, entity
gateway and gateway factory objects if required.  They will need to respond to a
specific set of methods.  We will denote details here later.

## Handler Factory

You must implement a single object in your codebase with a "make" method which
takes a string and generates an object with a "handle" method which takes an
object and operates on it.  An example:

```js
// HandlerFactory.js
const handlers = {
  'select race': {
    handle({ character }) {
      // do something with the character and its newly created race
    }
  }
}

module.exports = class {
  make(type) {
    if (!handlers.hasOwnProperty(type)) {
      // throw an error of some sort
    }
    return handlers[type]
  }
}
```

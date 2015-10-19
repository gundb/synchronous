# synchronous
One way binding of gun documents into a local object for synchronous use.

You are probably used to doing this:

```javascript
var mouse = {};
$(document).on('mousemove', function(e){
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

$("#where-is-the-mouse").click(function(){
  console.log("your mouse is at: " + mouse.x + ", " + mouse.y);
});
```

Well, you might want something similar with GUN. It is annoying doing:

```javascript
// this is annoying!
$("#what-is-my-data").click(function(){
  ref.val(function(val){
    console.log("your data is!", val);
  });
});
```

Instead it would be cool if we could do this:

```javascript
var data = {};
var ref = Gun().get('my/data').synchronous(data);

$("#what-is-my-data").click(function(){
  console.log("your data is!", data);
});
```

Well guess what! You already can! Just include this gun extension.

```html
<html>
  <head>
    <script src="https://rawgit.com/amark/gun/master/gun.js"></script>
    <script src="https://rawgithub.com/gundb/synchronous/master/synchronous.js"></script>
    <script>
      // your code here!
    </script>
  </head>
</html>
```

Or of course download the extension and include a reference to it locally.

##API
```javascript
gun.get('some/key').synchronous(obj, opt)
```

- `obj` is your local javascript object that you want to use synchronously, it will get one-way bindings of gun updates applied to it - including sub objects.

- `opt` no options currently.

##Warning

Synchronous operations are, well, synchronous. But the data is asynchronous, which means it might take time for the data to show up. Do not use this extension unless it does not matter how long it takes for the data to arrive. An example of that would be like a game, where you are using requestAnimationFrame so the data is getting processed continuously anyways - the async nature of the data doesn't matter much other than a few wasted frames. Elsewise it is better to use gun events to react to the data as it arrives, since it notifies you when it does.

This is intended for when you are using GUN in a document oriented way, if you use it with graph or relational based data it might result in an infinite loop or loading your entire dataset!

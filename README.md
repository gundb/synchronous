# synchronous
Syncs gun data to an object.

For uses that require high performance (such as rendering loops), the synchronous extension can help tremendously. It'll keep a local object updated with the latest information as it comes in, so instead of querying gun's API (which can be a performance drag), you can just use the local object.

**Pros**
 - increased performance

**Cons**
 - only supports document structures
 - still async in nature
 - no change events

## API
The extension exposes a new method for gun, called `.sync`. It takes two arguments:

 - The object to sync to
 - The options to use

> **Note:** the object will be populated asynchronously

```javascript
var players = {}
gun.get('players').sync(players)
```

## Options
There is only one configuration option: whether or not to sync the metadata. If you need to access the UUID, or need to make local changes and `.put` them into gun, you'll need to keep the metadata.

```javascript
gun.get('players').sync(players, {
	meta: true
})
```

Since this is the most common (and only) option available, there's a shorthand for it:

```javascript
gun.get('players').sync(players, true)
```

Both are equivalent.

## Warning

Synchronous operations are, well, synchronous. But the data is asynchronous, which means it might take time for the data to show up. Do not use this extension unless it does not matter how long it takes for the data to arrive. An example of that would be like a game, where you are using requestAnimationFrame so the data is getting processed continuously anyways - the async nature of the data doesn't matter much other than a few wasted frames. Elsewise it is better to use gun events to react to the data as it arrives, since it notifies you when it does.

This is intended for when you are using GUN in a document oriented way, if you use it with graph or relational based data it might result in an infinite loop or loading your entire dataset.

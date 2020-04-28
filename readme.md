## 💻  `Motivation`

This repo is intended as some sort bootstrap as it includes:

1. How to register multiple block using [Create Guten Block](https://github.com/ahmadawais/create-guten-block). (Kudos Ahmad Awais)
2. How to extend and modify an existing block (table block)
3. Use of shortcodes in blocks
4. Shortcode server side rendering (SSR)

**Caveat: ** So, keep in mind that this plugin won't work as is. You'll need to wire it with your project.
It depends on the specific case, but I'd say that you'll need to do the following adjustments:
1. Add your CSS
2. Use your own shortcodes
3. Remove blocks or logic that you don't need
4. Last but not least and very optional: Rename the Blocks category  

----

Below you will find some information on how to run scripts.

>You can find the most recent version of this guide [here](https://github.com/ahmadawais/create-guten-block).

## 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

## 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

## 👉  `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

---
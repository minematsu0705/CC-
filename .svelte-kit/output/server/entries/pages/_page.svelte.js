import { b as attr } from "../../chunks/attributes.js";
import { e as escape_html } from "../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let dishName = "";
    $$renderer2.push(`<main class="container mx-auto p-4 max-w-2xl"><h1 class="text-3xl font-bold mb-6 text-center">レシピジェネレーター</h1> <div class="mb-4"><label for="dish" class="block mb-2 font-medium">料理名</label> <div class="flex gap-2"><input id="dish" type="text"${attr("value", dishName)} class="border p-2 rounded w-full" placeholder="例: カレー, 肉じゃが"/> <button${attr("disabled", !dishName, true)} class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors">${escape_html("レシピを作る")}</button></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};

<script lang="ts">
  let dishName = "";
  let generating = false;
  let recipe: {
    name: string;
    ingredients: string[];
    steps: string[];
    tips: string;
  } | null = null;
  let error: string | null = null;

  async function generateRecipe() {
    if (!dishName) return;

    generating = true;
    error = null;
    recipe = null;

    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dishName }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      recipe = await response.json();
    } catch (e: any) {
      error = e.message;
    } finally {
      generating = false;
    }
  }
</script>

<main class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold mb-6 text-center">レシピジェネレーター</h1>

  <div class="mb-4">
    <label for="dish" class="block mb-2 font-medium">料理名</label>
    <div class="flex gap-2">
      <input
        id="dish"
        type="text"
        bind:value={dishName}
        class="border p-2 rounded w-full"
        placeholder="例: カレー, 肉じゃが"
        on:keydown={(e) => e.key === "Enter" && generateRecipe()}
      />
      <button
        on:click={generateRecipe}
        disabled={generating || !dishName}
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {generating ? "生成中..." : "レシピを作る"}
      </button>
    </div>
  </div>

  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong class="font-bold">エラー:</strong>
      <span class="block sm:inline">{error}</span>
    </div>
  {/if}

  {#if recipe}
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-bold mb-4">{recipe.name}</h2>

      <div class="mb-4">
        <h3 class="text-xl font-semibold mb-2">材料</h3>
        <ul class="list-disc pl-5">
          {#each recipe.ingredients as ingredient}
            <li>{ingredient}</li>
          {/each}
        </ul>
      </div>

      <div class="mb-4">
        <h3 class="text-xl font-semibold mb-2">作り方</h3>
        <ol class="list-decimal pl-5 space-y-2">
          {#each recipe.steps as step}
            <li>{step}</li>
          {/each}
        </ol>
      </div>

      {#if recipe.tips}
        <div class="bg-yellow-50 p-4 rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-800 mb-1">コツ・ポイント</h3>
          <p class="text-gray-700">{recipe.tips}</p>
        </div>
      {/if}
    </div>
  {/if}
</main>

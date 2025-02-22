<template>
  <section class="h-[100vh] flex flex-col justify-between">
    <header class="p-3 w-full bg-neutral-900 border-b-2 border-neutral-800">
      <h1 class="text-2xl text-white font-bold"><slot name="header"></slot></h1>
    </header>

    <div class="p-4 flex-grow-1">
      <slot></slot>
    </div>
  </section>
</template>

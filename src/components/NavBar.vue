<template>
    <nav class="nav-container">
        <ul class="nav">
        <div>
            <li>
            <router-link to="/">Home</router-link>
        </li>
        </div>
        <div>
            <li>
            <router-link to="/goal-keeper">Goal Keeper</router-link>
        </li>
        </div>
        <li>
            <router-link to="/practice-regimen">Practice Regimen</router-link>
        </li>
        </ul>
        <div class="test-display">
            <p>
                <!-- <strong>Current route path:</strong> {{ $route.path }} -->
            </p>
        </div>
    </nav>
</template>

<style>
 router-link {
    text-decoration: none;
    color: var(--color);
    font-size: 1.5rem;
 }
 </style>
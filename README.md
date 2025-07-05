<div align="center">
  <br />
    <a href="https://github.com/zeeshandev15/EchoShop" target="_blank">
      <img src="https://github.com/zeeshandev15/EchoShop/blob/master/Echo-shop%20-design.png" alt="Project Banner">
    </a>
  <br />

  <div>
   <img
  src="https://img.shields.io/badge/Next.js-0070F3?style=for-the-badge&logo=next.js&logoColor=white"
  alt="Next.js"
/>
    <img src="https://img.shields.io/badge/-JavaScript-green?style=for-the-badge&logoColor=white&logo=javascript&color=28A745" alt="javascript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="reduxtoolkit" />
  </div>

  <h3 align="center">A Movie flix App</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

Developed a high-performance, responsive e-commerce website with a modern, intuitive user interface and enhanced accessibility.

If you're getting started and need assistance or face any bugs, join our active Discord community with over **34k+** members. It's a place where people help each other out.

<a href="https://discord.com/invite/n6EdbFJ" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/618f4872-1e10-42da-8213-1d69e486d02e" /></a>

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- JavaScript
- TailwindCSS
- Redux Toolkit

## <a name="features">🔋 Features</a>

👉 **Movie Listings**: Display a list of movies with details like title, poster, release year, rating, and genre.

👉 **Trailer Display**: When a user clicks on a movie, a modal or separate section should show the movie trailer.

👉 **Skeleton Loading**: Implement skeleton loading screens (placeholders) while the movie data is being fetched.

👉 **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.


and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [Yarn](https://www.yarnpkg.com/) (Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/zeeshandev15/EchoShop.git
cd  ./
```

**Installation**

Install the project dependencies using yarn:

```bash
yarn add
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#Firebase
VITE_APP_TMDB_TOKEN=
```

Replace the placeholder values with your actual TMDB credentials. You can obtain these credentials by signing up on the [TMDB Website](https://www.themoviedb.org/)


**Running the Project**

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
```

</details>

<details>
<summary><code>src/app/globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========================================== TAILWIND STYLES */

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1;
  font-weight: 500;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  --black: #04152d;
  --black2: #041226;
  --black3: #020c1b;
  --black-lighter: #1c4b91;
  --black-light: #173d77;
  --pink: #da2f68;
  --orange: #f89e00;
  --gradient: linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--black);
}

::-webkit-scrollbar {
  display: none;
}

.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #0a2955;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#193763, 0) 0,
      rgba(#193763, 0.2) 20%,
      rgba(#193763, 0.5) 60%,
      rgba(#193763, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}```

</details>

<details>
<summary><code>src/utils/page.js</code></summary>

```javascript
"use client ";
import axios from "axios";

// this url base key when we will search then it will be provide BASE_URL
// search example api request
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzI0MzkxZGQ2ZjEzMjIxZDZhMzZkYmQwOGUwYTk5ZCIsInN1YiI6IjY1ZTc0Mjk1NTY4NDYzMDE4NmE4ZmYyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIEuSlvLAODr3bGtkU-vWyvuOPQFqwv3g4fgCA4h6pc";

const headers = {
  // dont forget space in 'bearer '
  Authorization: "bearer " + TMDB_TOKEN,
};

// fetch data from api
export const fetchDatafromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
```
</details>

<details>
<summary><code>src/store/Homeslice.js</code></summary>

```javascript
"use client";
import { createSlice } from "@reduxjs/toolkit";

const Homeslice = createSlice({
  name: "counter",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = Homeslice.actions;
export default Homeslice.reducer;
```
</details>

<details>
<summary><code>src/hooks/page.js</code></summary>

```javascript
import { useEffect, useState } from "react";
import { fetchDatafromApi } from "@/utils/page";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchDatafromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

</details>

## <a name="links">🔗 Assets</a>

Public assets used in the project can be found [here](https://github.com/Hi-Dear-486/Movie-flix-App/tree/master/public/assets)

## <a name="more">🚀 More</a>

**Advance your skills with Next.js**

Enjoyed creating this project? Dive deeper  for a richer learning adventure. They're packed with detailed explanations, cool features, and exercises to boost your skills. Give it a go!

<a href="https://github.com/Hi-Dear-486/Projects-Gallery-Tool" target="_blank">
<img src="https://github.com/Hi-Dear-486/Projects-Gallery-Tool/blob/master/Untitled%20design.png" alt="Project Banner">
</a>

<br />
<br />

#

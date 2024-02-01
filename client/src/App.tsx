import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header/Header.component.tsx";
import CatalogueProducts from "./pages/CatalogueProducts/CatalogueProducts.component.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <CatalogueProducts />
    </QueryClientProvider>
  );
}

export default App;

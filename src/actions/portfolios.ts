import { IPortfolio } from "@/types/interfaces";
import axios from "axios";
import { useApiHandler, fetcher } from "@/actions";
import useSWR from "swr";

const createPortfolio = (data: IPortfolio) =>
  axios.post("/api/v1/portfolios", data);
const updatePortfolio = (id: string, data: IPortfolio) =>
  axios.patch(`/api/v1/portfolios/${id}`, data);
const deletePortfolio = (id: string) =>
  axios.delete(`/api/v1/portfolios/${id}`);

// this is like redux
export const useCreatePortfolio = () => useApiHandler(createPortfolio);
export const useUpdatePortfolio = () => useApiHandler(updatePortfolio);
export const useDeletePortfolio = () => useApiHandler(deletePortfolio);

export const useGetPortfolio = (id: string) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/portfolios/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

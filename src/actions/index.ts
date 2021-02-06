import { useState } from "react";

interface State {
  error: null | Error;
  data: any;
  loading: boolean;
}

export const fetcher = (url: string) =>
  fetch(url).then(
    async (res: Response): Promise<any> => {
      const result = await res.json();

      if (res.status !== 200) {
        return Promise.reject(result);
      } else {
        return result;
      }
    }
  );

export function useApiHandler(apiCall: Function) {
  const [reqState, setReqState] = useState<State>({
    error: null,
    data: null,
    loading: false,
  });
  const handler = async (...data: any[]) => {
    setReqState({ error: null, data: null, loading: true });
    try {
      const res = await apiCall(...data);
      setReqState({ error: null, data: res.data, loading: false });
      // alert(res.data);
      console.log("response from creating portfolio", res.data);
      return res.data;
    } catch (e) {
      // short circuting in or. if first expression is true, we dont evaluate the second.
      const message =
        (e.response && e.response.data) || "Ooops, something went wrong...";
      setReqState({ error: message, data: null, loading: false });
      console.log("error from creating portfolio", e.message);
      return Promise.reject(message);
    }
  };

  return [handler, { ...reqState }] as const;
}

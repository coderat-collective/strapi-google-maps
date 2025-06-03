import { AxiosInstance, AxiosResponse } from 'axios';
import { Config } from '../../../server/src/interface';
declare const useAxios: (token: string) => AxiosInstance;
export default useAxios;
export declare const getConfig: (token: string) => Promise<AxiosResponse>;
export declare const updateConfig: (token: string, config: Config) => Promise<AxiosResponse>;

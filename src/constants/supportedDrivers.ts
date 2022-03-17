import driverMethods from "@/utils/drivers";

import DriverMethodName from "@/@types/DriverMethodName";

const METHOD_KEYS = Object.keys(driverMethods);

const drivers: DriverMethodName[] = METHOD_KEYS as DriverMethodName[];

export default new Set(drivers);

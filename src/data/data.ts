import hooks, { type KnowledgeCard } from "./hooks";
import redux from "./redux";
import router from "./router";
import tanStack from "./tanStack";
import testing from "./testing";
import theory from "./theory";
import tsUtils from "./tsUtils";

const data: KnowledgeCard[] = [
    ...hooks,
    ...redux,
    ...router,
    ...tanStack,
    ...testing,
    ...theory,
    ...tsUtils,
];
export default data;
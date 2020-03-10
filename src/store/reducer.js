const defaultState = {

}
export default (state = defaultState, action) => {
    if (action.type === 'click_digital' || action.type === 'click_symbol') {
        const stateObj = JSON.parse(JSON.stringify(state));
        stateObj.subject.formula = `${stateObj.subject.formula}${action.value}`;
        return stateObj;
    }
    if (action.type === 'click_result') {
        const stateObj = JSON.parse(JSON.stringify(state));
        if (action.value === 'C') {
            stateObj.subject.formula = ''
        }
        if (action.value === '=') {
            if (stateObj.subject.formula !== '') {
                stateObj.subject.result = eval(stateObj.subject.formula);
            }
        }
        return stateObj;
    }
    if (action.type === 'init_subject') {
        const stateObj = JSON.parse(JSON.stringify(state));
        stateObj[action.value.storeKey] = action.value[action.value.storeKey];
        return stateObj;
    }
    if (action.type === 'get_match') {
        const stateObj = JSON.parse(JSON.stringify(state));
        stateObj['subject_match_result'] = action.value;
        return stateObj;
    }
    if (action.type === 'get_art') {
        const stateObj = JSON.parse(JSON.stringify(state));
        stateObj['subject_art_result'] = action.value;
        return stateObj;
    }
    if (action.type === 'get_match_extras') {
        const stateObj = JSON.parse(JSON.stringify(state));
        stateObj['subject_match_extras'] = action.value;
        return stateObj;
    }
    if (action.type === 'get_art_extras') {
        const stateObj = JSON.parse(JSON.stringify(state));
        stateObj['subject_art_extras'] = action.value;
        return stateObj;
    }
    return state;
}
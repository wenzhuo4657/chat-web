import {GptVersion} from "@/app/constants";
import {useAccessStore} from "@/app/store/access";
import {MessageRole} from "@/types/chat";
import {getServerSideConfig} from "@/app/config/server";

// 构建前把localhost修改为你的公网IP或者域名地址
// const {apiHostUrl} = getServerSideConfig();

const apiHostUrl = process.env.NEXT_PUBLIC_API_HOST_URL;
const bigMarketApiHostUrl=process.env.bigMarketApiHostUrl;

/**
 * Header 信息
 */
function getHeaders() {
    const accessState = useAccessStore.getState()

    const headers = {
        Authorization: accessState.token,
        'Content-Type': 'application/json;charset=utf-8'
    }

    return headers
}



/**
 * 流式应答接口
 * @param data
 */
export const completions = (data: {
    messages: { content: string; role: MessageRole }[],
    model: GptVersion
}) => {
    return fetch(`${apiHostUrl}/api/v1/chatgpt/chat/completions`, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
};

/**
 * 登录鉴权接口
 * @param token
 */
export const login = (token: string) => {
    const accessState = useAccessStore.getState()
    return fetch(`${apiHostUrl}/api/v1/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `code=${accessState.accessCode}`
    });
};





export const queryAccountQuota = () => {
    return fetch(`${apiHostUrl}/api/v1/account/query_account_quota`, {
        method: "post",
        headers: {
            ...getHeaders(),
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    });
}

/**
 * 日历签到返利接口
 */
export const calendarSignRebate = () => {
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/activity/calendar_sign_rebate_by_token`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 判断是否签到接口
 */
export const isCalendarSignRebate = () => {
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/activity/is_calendar_sign_rebate_by_token`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 查询账户额度
 * @param activityId    活动ID
 */
export const queryUserActivityAccount = (activityId?: number) => {
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/activity/query_user_activity_account_by_token`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                activityId: activityId
            })
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

export const queryUserCreditAccount = ()=>{
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/activity/query_user_credit_account_by_token`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 抽奖接口
 * @param activityId 用户ID
 */
export const draw = (activityId?: number) => {
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/activity/draw_by_token`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                activityId: activityId
            })
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}


/**
 * 查询抽奖奖品列表
 * @param activityId 用户ID
 */
export const queryRaffleAwardList = (activityId?: number) => {
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/strategy/query_raffle_award_list_by_token`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activityId: activityId
            })
        });
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}


export const querySkuProductListByActivityId = (activityId?: number)=>{
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/activity/query_sku_product_list_by_activity_id?activityId=${activityId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

export const creditPayExchangeSku = (sku?: number) => {
    try {
        return fetch(`${bigMarketApiHostUrl}/api/v1/raffle/activity/credit_pay_exchange_sku_by_token`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                sku: sku
            })
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

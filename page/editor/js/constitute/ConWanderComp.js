/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-3-5
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
var WanderComp = {};
IWIN.util.extend(WanderComp,AccordionComp);
IWIN.util.extend(WanderComp,{
    imgClass : 'WANDER_COMP_img'
});

IWIN.Options.comp_map['9'] = WanderComp;

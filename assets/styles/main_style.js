import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { useAuth } from "../../Screens/AuthContext";

const style = () => {
  const { groupTheme } = useAuth();

  return (
    StyleSheet.create({
      parentDiv: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%'
      },

      logo_default_size: {
        width: 230,
        height: '150',
        resizeMode: "contain",
        marginBottom: 5,
      },

      text_default: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 20,
        marginVertical: 10,
        fontFamily: 'Inter_18pt-Bold'
      },

      GroupScreenOptionBtns: {
        backgroundColor: colors.primary,
        marginVertical: 15,
        padding: 10,
        width: '100%',
        height: 70,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },

      GroupText: {
        color: colors.gold,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1,
        fontFamily: "Inter_18pt-Bold",
      },

      headingText: {
        fontSize: 20,
        color: colors.primary,
        width: 'auto',
        marginBottom: 5,
        fontWeight: 'bold',
        fontFamily: 'CrimsonText-Bold'
      },

      whiteCardBgStyle: {
        backgroundColor: colors.white,
        width: 320,
        height: 'auto',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.4)'
      },

      inputField: {
        width: '100%',
        borderWidth: 1,
        marginVertical: 5,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        color: '#000',
        backgroundColor: '#fff',
        fontFamily: "Inter_18pt-Bold",
      },

      lableText: {
        textAlign: 'left',
        width: '100%',
        color: colors.primary,
        fontWeight: '700',
        fontSize: 16,
        fontFamily: "Inter_18pt-Bold",
      },

      button: {
        width: '80%',
        backgroundColor: colors.primary,
        color: colors.white,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 15,
        paddingHorizontal: 20,
        elevation: 5,
      },
      buttonText: {
        fontSize: 18,
        color: colors.white,
        fontWeight: '700'
      },

      subText: {
        width: '100%',
        textAlign: 'right',
        color: colors.primary
      },

      sec_button: {
        width: '80%',
        backgroundColor: 'transperent',
        color: colors.primary,
        borderWidth: 1,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingHorizontal: 20,
      },

      sec_buttonText: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: 18
      },

      eyeButton: {
        position: 'absolute',
        top: 20,
        right: 15,
      },

      modalDesign: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blkTrns2,
      },

      modalContainerDesign: {
        backgroundColor: colors.white,
        width: 300,
        minHeighteight: '350',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        position: 'relative'
      },

      closeBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
      },

      boldText: {
        fontSize: 14,
        textAlign: 'left',
        fontWeight: '700',
        fontFamily: 'Inter_18pt-Bold',
        color: colors.primary
      },

      relativeCode: {
        position: "relative",
      },

      absoluteCode: {
        position: 'absolute',
        right: '15',
        top: '10'
      },

      notificationStyle: {
        backgroundColor: colors.white,
        borderRadius: '50%',
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#fff',
        elevation: 5,
      },

      home_banner_img: {
        width: '300',
        resizeMode: 'contain',
        marginTop: 0,
      },

      home_banner_txt: {
        textAlign: 'center',
        fontWeight: 'semibold',
        fontSize: 25,
        color: colors.brown,
        fontFamily: 'CrimsonText-Bold'
      },

      materialHomeDesign: {
        backgroundColor: colors.darkGold,
        width: 80,
        height: 80,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        resizeMode: 'contain',
        gap: 20
      },

      listItem: {
        justifyContent: 'center',
        alignItems: 'center'
      },

      textDefault: {
        fontFamily: "Inter_18pt-Bold",
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 16,
      },

      home_pdf_Icon: {
        width: 50,
        height: 50,
      }

    })
  )
}

export default style;
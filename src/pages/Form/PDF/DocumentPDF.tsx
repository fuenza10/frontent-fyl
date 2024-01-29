//@ts-nocheck
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  // Image,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

// import logo from "../../assets/imgs/logoTSM1.png";
import oswaldBold from './font/Oswald-Bold.ttf';
import oswald from './font/Oswald.ttf';
import { formateDate } from '@/src/common/functions/date-formater';

Font.register({
  family: 'Oswald',
  src: oswald,
});
Font.register({
  family: 'Oswald-Bold',
  src: oswaldBold,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Oswald',
  },
  card: {
    margin: 10,
    padding: 10,
    border: '1pt solid #e0e0e0',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    fontSize: 11,
  },
  mountFinal: {
    fontSize: 11,
    fontFamily: 'Oswald-Bold',
  },
  separator: {
    marginVertical: 10, // Este margen da espacio por encima y por debajo de la línea
    borderBottom: '2pt solid #000', // Esta es la línea
  },
  image: {
    maxFHeight: '20px',
    maxWidth: '100px',
    marginHorizontal: 2,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 35,
    right: 35,
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
const Footer = ({ userName, rut }) => (
    <View style={styles.footer}>
      <Text> ____________________________</Text>
      <Text>Nombre: {userName}</Text>
      <Text>Rut: {rut}</Text>
    </View>
  );
export const DocumentPDF = ({
  formResponses,
  formName,
  companyName,
  dateCreate,
  companyRut,
  user
}) => {
  return (
    <Document>
      <Page style={styles.body}>
        {/* <Image src={logo} style={styles.image} /> */}
        <Text style={styles.title}>{formName}</Text>
        <View>
          <View style={styles.card}>
            <Text style={styles.subtitle}>Datos Empresa</Text>
            <Text style={styles.content}>
              Nombre de la Empresa: {companyName}{' '}
            </Text>
            <Text style={styles.content}>Rut de la Empresa: {companyRut} </Text>

            <View style={{ display: 'flex' }}>
              <Text style={styles.content}>
                Fecha de Respuesta: {dateCreate}
              </Text>
              <Text style={styles.content}>
                Fecha de Emisión: {formateDate(new Date())}
              </Text>
              {/* <Text style={styles.content}>Tiempo de Servicio:</Text> */}
            </View>
            <View style={styles.separator} />
            <Text style={styles.subtitle}>Informe</Text>
            {formResponses.map((item) => (
              <React.Fragment key={item.id}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.content}>{item.formField.label}</Text>
                  </View>
                  <View style={styles.content}>
                    {item.formField.type === 'checkbox' ? (
                      <Text style={styles.text}>
                        {item.value === 'true' ? 'Si' : 'No'}
                      </Text>
                    ) : (
                      <Text style={styles.text}>{` ${item.value}`}</Text>
                    )}
                  </View>
                </View>
              </React.Fragment>
            ))}
          </View>

        </View>
        <Footer userName={`${user.firstName} ${user.lastName}`} rut={user.rut} />
      </Page>
    </Document>
  );
};
